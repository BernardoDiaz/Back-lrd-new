module.exports = {
  apps: [{
    name: "back",
    script: "./dist/index.js", // ajusta según tu archivo de entrada
    env: {
      NODE_ENV: "production",
      SECRET_KEY: "4UmkXEDZK?Xqa*hKMJ*AL5:vr;CGha*a7zj!G;3pm(rf5+GheFYLH#Kh=QtQ[HHj%q)T-[qZK-E@U+-}bApp9XQW3V[H=(ZRHBWGq/jvYp)YGnaVEcNv/98EGr(m}7FSp9TV{:?L_nU$.ieH0B1D", // reemplaza con tu valor real
      PORT: 8081
    }
  }]
}