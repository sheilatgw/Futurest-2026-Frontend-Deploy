import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { JSX } from "react/jsx-runtime";
import { SubDivisionData } from "../page";

interface Form3ComponentsProps {
  divisions: SubDivisionData[];
  requiredQuestions: number[];
  requiredStudyCases: number[];
}

export default function Form3Components({
  divisions,
  requiredQuestions,
  requiredStudyCases,
}: Form3ComponentsProps) {
  const { control, watch } = useFormContext();

  const primaryDivisionId = watch("primary_division_id");
  const primaryDivision = divisions.find((d) => d.id === primaryDivisionId);

  const makePrimaryQuestionFields = (division?: SubDivisionData) => {
    if (!division) return null;

    const fields: JSX.Element[] = [];

    // Add only required question fields
    requiredQuestions.forEach((i) => {
      const questionKey = `question_${i}` as keyof SubDivisionData;
      const answerKey = `answers_primary_division_question_${i}` as any;

      fields.push(
        <FormField
          key={`question-${i}`}
          control={control}
          name={answerKey}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {division[questionKey]} <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide your detailed answer..."
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />,
      );
    });

    // Add only required study case fields
    requiredStudyCases.forEach((i) => {
      const caseKey = `study_case_question_${i}` as keyof SubDivisionData;
      const answerKey = `answers_primary_division_study_case_${i}` as any;

      fields.push(
        <FormField
          key={`studycase-${i}`}
          control={control}
          name={answerKey}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <span className="font-semibold">Study Case {i}:</span>{" "}
                {division[caseKey]} <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe how you would approach this study case..."
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />,
      );
    });

    return fields;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-[30px] font-bold">Your Primary Division</h2>
        <p className="text-xl font-medium text-[#7A7A7A]">
          Please provide more information about your division.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          control={control}
          name="primary_division_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Primary Division <span className="text-red-600">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {divisions.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {primaryDivision && (
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-gray-600">
              This division has{" "}
              <span className="font-semibold">{requiredQuestions.length}</span>{" "}
              questions and{" "}
              <span className="font-semibold">{requiredStudyCases.length}</span>{" "}
              study cases to answer.
            </p>
          </div>
        )}

        {makePrimaryQuestionFields(primaryDivision)}
      </div>
    </div>
  );
}
