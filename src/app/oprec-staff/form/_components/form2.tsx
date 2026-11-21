import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Form2 } from "@/types/page/oprec-staff";
import { useFormContext } from "react-hook-form";

export default function Form2Components() {
  const { control } = useFormContext<Form2>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[30px] font-bold">
          Tell us more about yourself and your motivations.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          control={control}
          name="about_futurest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What is your opinion about futurest?{" "}
                <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your opinion about futurest"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="motivates_joining"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What motivates you to join?{" "}
                <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain your motivation"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="experience_in_organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Experience in organizations{" "}
                <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your past experience"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="strengths_and_weaknesses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Strengths & Weaknesses <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your strengths and weaknesses"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="current_activities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Current Activities <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What are you currently doing?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="commitment_plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Commitment Plan (1–10) <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex items-center justify-between gap-2"
                >
                  {Array.from({ length: 10 }, (_, i) => {
                    const value = (i + 1).toString();
                    return (
                      <label
                        key={value}
                        className="flex flex-col items-center gap-1 cursor-pointer select-none"
                      >
                        <RadioGroupItem value={value} />
                        <span className="text-xs text-muted-foreground">
                          {value}
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="have_any_relations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Do you have any relations in the organization?{" "}
                <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe any relations if any"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
