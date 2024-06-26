import Swal, { SweetAlertIcon } from "sweetalert2";
import './Notification.css'
class Notification {
  success(message: string) {
    Swal.fire({
      title: "Sucesso!",
      icon: "success",
      text: message,
      confirmButtonText: "OK",
      customClass: {
        container: 'container-swal'
      },
    });
  }

  error(message: string) {
    Swal.fire({
      title: "Erro!",
      icon: "error",
      text: message,
      confirmButtonText: "OK",
      customClass: {
        container: 'container-swal'
      },
    });
  }

  warn(title: string = "Aviso!", message: string) {
    Swal.fire({
      title: title,
      icon: "warning",
      text: message,
      confirmButtonText: "OK",
      customClass: {
        container: 'container-swal'
      },
    });
  }

  info(title: string = "Aviso!", message: string) {
    Swal.fire({
      title: title,
      icon: "info",
      text: message,
      confirmButtonText: "OK",
      customClass: {
        container: 'container-swal'
      },
    });
  }

  async confirm(message: string, title: string = "Tem certeza?", 
   nameButtonConfirm: string = 'Avançar', nameButtonCancel: string = 'Cancelar', confirmButtonColor:string = 'green', cancelButtonColor:string ='red', 
   icon:SweetAlertIcon  = 'warning' ,obj: object = {}) {
    return await Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      cancelButtonColor: cancelButtonColor,
      confirmButtonColor: confirmButtonColor,
      cancelButtonText: nameButtonCancel,
      confirmButtonText: nameButtonConfirm,
      ...obj,
      customClass: {
        container: 'container-swal'
      },
    }).then((result: any) => {
      return result.isConfirmed
    });
  }
}

export default new Notification();