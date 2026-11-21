import Button from "@/components/buttons/button";
import Typography from "@/components/typography";

type VariantType =
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "danger"
  | "outline"
  | "ghost"
  | "disabled";

function ButtonComponent({ variant }: { variant: VariantType }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Typography variant="bt" className="font-bold">
        {variant}
      </Typography>
      <Button variant={variant} size="lg" className="w-fit">
        Continue
      </Button>
      <Button variant={variant} size="md" className="w-fit">
        Continue
      </Button>
      <Button variant={variant} size="sm" className="w-fit">
        Continue
      </Button>
      <Button variant={variant} size="sm" className="w-fit" disabled>
        Continue
      </Button>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <main className="min-h-screen items-center justify-center bg-white py-20">
      <section className="flex flex-col items-center justify-center space-y-4 px-40">
        <Typography as="h4" variant="h4" weight="semibold">
          Button
        </Typography>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <ButtonComponent variant="primary" />
          <ButtonComponent variant="secondary" />
          <ButtonComponent variant="success" />
          <ButtonComponent variant="warning" />
          <ButtonComponent variant="danger" />
          <ButtonComponent variant="outline" />
          <ButtonComponent variant="ghost" />
          <ButtonComponent variant="disabled" />
        </div>
      </section>
    </main>
  );
}
