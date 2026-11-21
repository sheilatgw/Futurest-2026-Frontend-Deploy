import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { Form1 } from "@/types/page/oprec-staff";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function Form1Components() {
  const { control } = useFormContext<Form1>();
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");

  const { data: FACULTY = [] } = useQuery<
    {
      id: string;
      faculty: string;
      departments: { id: string; name: string }[];
    }[]
  >({
    queryKey: ["faculty"],
    queryFn: async () => {
      const res = await api.get("/api/v1/master/faculty");
      return res.data.data;
    },
  });

  const selectedFaculty = FACULTY.find((f) => f.id === selectedFacultyId);

  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="student_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Student ID <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="ex: 5026241153" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="batch"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Batch <span className="text-red-600">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your academic year" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem>
        <FormLabel>
          Faculty <span className="text-red-600">*</span>
        </FormLabel>
        <Select
          onValueChange={(value) => {
            setSelectedFacultyId(value);
          }}
          value={selectedFacultyId}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select your faculty" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {FACULTY.map((e) => (
              <SelectItem key={e.id} value={e.id}>
                {e.faculty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>

      <FormField
        control={control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Department <span className="text-red-600">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedFaculty?.departments?.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Phone Number <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="ex: 628123456789" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="line_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Line ID <span className="text-red-600">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="ex: @lineid" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
