export const handlePageReload = () => {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('@isReloading', 'true');
    });
  
    if (sessionStorage.getItem('@isReloading') === 'true') {
      localStorage.removeItem('@token'); 
      sessionStorage.removeItem('@isReloading');
    }
  };
  