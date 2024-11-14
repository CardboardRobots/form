Forms for `react-hook-form` and `@mui/material`.

```typescript
import { FormInput } from "@cardboardrobots/form";
import { useForm } from "react-hook-form";

const Form = () => {
  const { control } = useForm({
    defaultValues: {
      name: "name",
    },
  });

  return <FormInput control={control} name="name" label="First name" />;
};
```
