import pandas as pd
from flask import Flask, request, render_template
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

df = pd.read_csv("iris.csv")
X = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
y = df['species']

le = LabelEncoder()
y = le.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier()
model.fit(X_train, y_train)

@app.route('/')
def home():
    return render_template("index.html", active='home')

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        sl = float(request.form['sepal_length'])
        sw = float(request.form['sepal_width'])
        pl = float(request.form['petal_length'])
        pw = float(request.form['petal_width'])
        prediction = model.predict([[sl, sw, pl, pw]])
        result = le.inverse_transform(prediction)
        return render_template("predict.html", active='predict',
                               prediction_text="Flower Species : {}".format(result[0]))
    return render_template("predict.html", active='predict')

@app.route('/about')
def about():
    return render_template("about.html", active='about')

if __name__ == "__main__":
    app.run(debug=True)