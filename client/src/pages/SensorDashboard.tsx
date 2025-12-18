import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { getPrediction } from "@/lib/api";
import { SOIL_DATA } from "@/lib/data";

export default function SensorDashboard() {
  const { register, handleSubmit } = useForm({
    defaultValues: { ph: 6.5, moisture: 30 }
  });

  const mutation = useMutation(getPrediction);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Sensor Dashboard</h1>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="grid md:grid-cols-2 gap-4 mt-4">
        <input {...register("ph")} placeholder="pH" className="input" />
        <input {...register("moisture")} placeholder="Moisture" className="input" />
        <button className="bg-primary text-white rounded px-4 py-2">Predict</button>
      </form>

      {mutation.data && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p><b>Condition:</b> {mutation.data.condition.label}</p>
        </div>
      )}
    </div>
  );
}
