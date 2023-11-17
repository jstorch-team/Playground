import * as dfd from "danfojs-node";

const loss_function = (m, b, points) => {
  let total_error = 0;
  for (let i = 0; i < points.length; i++) {
    let x = points[i].Hours;
    let y = points[i].Scores;
    total_error += (y - (m * x + b)) ** 2;
  }

  total_error = total_error / points.length;
};

const gradient_descent = (m_now, b_now, points, pointsLen, L) => {
    let m_gradient = 0
    let b_gradient = 0

    let n = pointsLen

    console.log(n)

    for(let i = 0; i < n; i++){
        const x = points[i].Hours
        const y = points[i].Scores

        m_gradient += -(2/n) * x * (y - (m_now * x + b_now))
        b_gradient += -(2/n) * (y - (m_now * x + b_now))
    }

    const m = m_now - m_gradient * L
    const b = b_now - b_gradient * L

    return m, b
};

dfd
  .readCSV("../scores.csv")
  .then((df) => {
    let m = 0
    let b = 0
    let L = 0.0001
    let epochs = 1000

    let dfLen = df.size

    for(let i = 0; i < epochs; i++) {
        m, b = gradient_descent(m, b, df, dfLen, L)
    }

    console.log(`m: ${m}, b: ${b}`)

  })
  .catch((err) => {
    console.log(err);
  });
