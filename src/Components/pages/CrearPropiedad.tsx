import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import type { NuevaPropiedadPayload } from "../../types/index";

function CrearPropiedad() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NuevaPropiedadPayload>();

  const onSubmit = async (data: NuevaPropiedadPayload) => {
    const user = JSON.parse(localStorage.getItem("usuario") || "{}");
    const id_usuario = user?.id;

    if (!id_usuario) {
      toast.error("Error: No se encontró usuario logueado.");
      return;
    }

    try {
      const payload = {
        ...data,
        id_usuario: id_usuario,
      };

      await axios.post("http://localhost:3000/api/propiedades", payload);
      toast.success("Propiedad creada exitosamente");
    } catch (error: any) {
      toast.error("Error al crear propiedad");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Publicar una Propiedad
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Completa los datos del alojamiento
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                {...register("titulo", { required: "Título requerido" })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
              {errors.titulo && (
                <p className="text-red-600 text-sm">{errors.titulo.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                {...register("descripcion")}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                {...register("direccion", { required: "Dirección requerida" })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
              {errors.direccion && (
                <p className="text-red-600 text-sm">
                  {errors.direccion.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ubicación
              </label>
              <input
                {...register("ubicacion", { required: "Ubicación requerida" })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
              {errors.ubicacion && (
                <p className="text-red-600 text-sm">
                  {errors.ubicacion.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Habitaciones
              </label>
              <input
                type="number"
                {...register("cant_habitaciones", { required: true, min: 1 })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Baños
              </label>
              <input
                type="number"
                {...register("cant_baños", { required: true, min: 1 })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad Máxima
              </label>
              <input
                type="number"
                {...register("capacidad_max", { required: true, min: 1 })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio por Noche
              </label>
              <input
                type="number"
                step="0.01"
                {...register("precio_noche", { required: true, min: 0 })}
                className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Publicar Propiedad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearPropiedad;
