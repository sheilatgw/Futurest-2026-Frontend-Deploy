import Typography from "@/components/typography";
import UploadFile from "../FileUpload";
import FormInput from "../FormInput";

export default function SupportingFiles() {
  return (
    <div className="w-full">
      <div className="bg-[#f8f9fa] p-6 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
        <div className="text-center mb-8">
          <Typography
            font="Sora"
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Supporting Files
          </Typography>
        </div>
        <div className="space-y-6">
          <FormInput
            name="portfolio_link"
            label="Portfolio"
            placeholder="Google Drive link with open access"
            type="url"
            required
          />

          <div className="w-full">
            <UploadFile
              name="student_id_file"
              title="Student ID Card"
              variant="lg"
              isRequired
              supportFiles={[".pdf"]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UploadFile
              variant="md"
              name="cv_file"
              title="CV ATS/Creative"
              isRequired
              supportFiles={[".pdf"]}
            />

            <UploadFile
              variant="md"
              name="twibbon_proof"
              title="Proof Twibbon upload"
              isRequired
              supportFiles={[".jpg", ".png", ".jpeg"]}
            />

            <UploadFile
              variant="md"
              name="follow_futurest_proof"
              title="Proof follow Instagram @futurest.2026"
              isRequired
              supportFiles={[".jpg", ".png", ".jpeg"]}
            />

            <UploadFile
              variant="md"
              name="follow_sre_proof"
              title="Proof follow Instagram @sre.its"
              isRequired
              supportFiles={[".jpg", ".png", ".jpeg"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
