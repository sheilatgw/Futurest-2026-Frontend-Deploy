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
// _components/form4.tsx
import { useFormContext } from "react-hook-form";
import { JSX } from "react/jsx-runtime";
import { SubDivisionData } from "../page";

interface Form4ComponentsProps {
  divisions: SubDivisionData[];
  requiredQuestions: number[];
  requiredStudyCases: number[];
}

export default function Form4Components({
  divisions,
  requiredQuestions,
  requiredStudyCases,
}: Form4ComponentsProps) {
  const { control, watch } = useFormContext();

  const secondaryDivisionId = watch("secondary_division_id");
  const secondaryDivision = divisions.find((d) => d.id === secondaryDivisionId);

  const makeSecondaryQuestionFields = (division?: SubDivisionData) => {
    if (!division) return null;

    const fields: JSX.Element[] = [];

    // Add only required question fields
    requiredQuestions.forEach((i) => {
      const questionKey = `question_${i}` as keyof SubDivisionData;
      const answerKey = `answers_secondary_division_question_${i}` as any;

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
      const answerKey = `answers_secondary_division_study_case_${i}` as any;

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
        <h2 className="text-[30px] font-bold">Your Secondary Division</h2>
        <p className="text-xl font-medium text-[#7A7A7A]">
          Please provide more information about your secondary division.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <FormField
          control={control}
          name="secondary_division_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Secondary Division <span className="text-red-600">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your secondary division" />
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

        {secondaryDivision && (
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

        {makeSecondaryQuestionFields(secondaryDivision)}
      </div>
    </div>
  );
}
