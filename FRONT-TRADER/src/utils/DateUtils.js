// src/utils/DateUtils.js
class DateUtils {
    // Método para retornar a data de hoje no formato 'YYYY-MM-DD'
    static getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  
    // Método para calcular a data de início e fim de acordo com o intervalo
    static getDateRange(interval) {
      const endDate = DateUtils.getTodayDate();
  
      let startDate;
      switch (interval) {
        case 'today':
          startDate = endDate;
          break;
        case 'thisweek':
          startDate = DateUtils.getStartDateOfWeek(endDate);
          break;
        case 'thismonth':
          startDate = DateUtils.getStartDateOfMonth(endDate);
          break;
        case 'thisyear':
          startDate = DateUtils.getStartDateOfYear(endDate);
          break;
        default:
          startDate = endDate;
          break;
      }
  
      return { startDate, endDate };
    }
  
    // Método para calcular a data de início da semana
    static getStartDateOfWeek(dateString) {
      const date = new Date(dateString);
      const dayOfWeek = date.getDay();
      const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is sunday
      const firstDay = new Date(date.setDate(diff));
      return firstDay.toISOString().split('T')[0];
    }
  
    // Método para calcular a data de início do mês
    static getStartDateOfMonth(dateString) {
      const date = new Date(dateString);
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      return firstDay.toISOString().split('T')[0];
    }
  
    // Método para calcular a data de início do ano
    static getStartDateOfYear(dateString) {
      const date = new Date(dateString);
      const firstDay = new Date(date.getFullYear(), 0, 1);
      return firstDay.toISOString().split('T')[0];
    }
  }
  
  export default DateUtils;
  