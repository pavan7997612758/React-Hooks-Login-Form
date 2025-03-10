import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "You must be at least 18 years old"),
  password: z.number().min(8,"must be at least 8 numbers"),
});

// Infer TypeScript types from the schema
type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div>
        <label>Name:</label>
        <input {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <label>Age:</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p className="error">{errors.age.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="number"{...register("password", { valueAsNumber:true})} />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
