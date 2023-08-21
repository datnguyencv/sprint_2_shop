import Swal from "sweetalert2";

export const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        cancelButton: 'btn btn-secondary',
        confirmButton: 'btn btn-danger'
    },
    buttonsStyling: false
})
export const showResultAlert = (res) => {
    if (res != null) {
        if (res) {
            Swal.fire({
                icon: "success",
                title: "Xóa thành công !",
                timer: 2000
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Xóa thất bại !",
                timer: 2000
            })

        }
    }
}