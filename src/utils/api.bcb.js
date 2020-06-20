const axios = require('axios')
const { format } = require('date-fns')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    if (today.getDay() === 6) {
      return format((today.setDate(today.getDate() -1 )), 'MM-dd-yyyy')
    } else if (today.getDay() === 0) {
        return format((today.setDate(today.getDate() -1 )), 'MM-dd-yyyy')
    }
}
const getCotacao = ({ getToday, getUrl, getCotacaoAPI, extractCotacao }) => async() => {
    try{
        const today = getToday()
        const url = getUrl(today)
        const res = await getCotacaoAPI(url)
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err){
        return ''
    }
}

module.exports = {
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    getUrl,
    getToday,
    pure: {
        getCotacao
    }
}