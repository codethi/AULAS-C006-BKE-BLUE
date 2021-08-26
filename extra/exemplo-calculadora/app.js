const calc = require('./calculadora');
const prompt = require('prompt-sync')();

console.log(`Olá, seja bem vindo a ${calc.nome}`)

const num01 = +prompt('Digite o primeiro número: ')
const num02 = +prompt('Digite o segundo número: ')
console.log()
console.log(
`Qual calculo você gostaria de fazer?
    [1] - soma
    [2] - subtração
    [3] - multiplicação
    [4] - divisão
`)
const opcao = +prompt('Sua escolha: ')

if (opcao === 1){
    console.log(`${num01} + ${num02} = ${calc.soma(num01, num02)}`)
} else if (opcao === 2){
    console.log(`${num01} - ${num02} = ${calc.sub(num01, num02)}`)
} else if (opcao === 3){
    console.log(`${num01} x ${num02} = ${calc.mult(num01, num02)}`)
} else if (opcao === 4){
    console.log(`${num01} / ${num02} = ${calc.div(num01, num02)}`)
} else {
    console.log('A opção escolida está indisponível, volte sempre!')
}

// IF ternário:

/* opcao === 1
  ? console.log(`${n1} + ${n2} = ${calc.soma(n1, n2)}`)
  : opcao === 2
  ? console.log(`${n1} - ${n2} = ${calc.sub(n1, n2)}`)
  : opcao === 3
  ? console.log(`${n1} x ${n2} = ${calc.mult(n1, n2)}`)
  : opcao === 4
  ? console.log(`${n1} / ${n2} = ${calc.div(n1, n2)}`)
  : console.log("Opção inválida!"); */