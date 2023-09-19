const MONTHS = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  

const formatDayText = (dataHora: string) => {
  const date = dataHora?.split('T');
  const dataArr = date[0]?.split('-');

  const usDate = `${String(dataArr[1])}/${dataArr[2]}/${dataArr[0]}`;
  const usFullDate = new Date(usDate);
  
  const month = usFullDate.getMonth();

  return `${dataArr[2]} de ${MONTHS[month]} de ${dataArr[0]}`;
};

const usDateFunc = (dataHora: string) => {
  const date = dataHora?.split('T');
  const dataArr = date[0]?.split('-');

  const usDate = `${String(dataArr[1])}/${dataArr[2]}/${dataArr[0]}`;
  const usFullDate = new Date(usDate);
  
  const month = usFullDate.getMonth();

  return usFullDate;
};

export { formatDayText, usDateFunc };