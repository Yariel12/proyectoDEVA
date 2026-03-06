import Swal from "sweetalert2";

export const useConfirm = () => {
  const confirm = async (text) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });

    return result.isConfirmed;
  };

  return { confirm };
};
