import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[2rem] bg-sidebar px-8 py-8 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.22em] text-blue-300">
            Manufacturing Internal Tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            Sales Sampling Workflow Control Center
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Track every step from lead enquiry to PI dispatch while strictly masking
            client identity from operations teams.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
