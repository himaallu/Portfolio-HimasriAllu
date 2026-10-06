import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-content flex min-h-[70vh] flex-col items-start justify-center pt-32">
      <p className="font-label text-gradient">404</p>
      <h1 className="mt-3 font-display text-section font-semibold tracking-display">This page does not exist.</h1>
      <Button href="/" className="mt-8">Back home</Button>
    </section>
  );
}
