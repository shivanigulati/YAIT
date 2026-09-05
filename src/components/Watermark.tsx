export default function Watermark({ className = "" }: { className?: string }) {
  return (
    <div className={`watermark ${className}`} aria-hidden="true">
      <span>YA IT</span>
    </div>
  );
}
