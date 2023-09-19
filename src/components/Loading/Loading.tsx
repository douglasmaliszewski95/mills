import useScreenWidth from "@/services/hooks/useScreenWidth";
interface LoadingProps {
  open: boolean;
}
export const Loading = ({ open }: LoadingProps) => {
  return (
    <section
      className={`${
        open ? "hidden" : "flex"
      } items-center justify-center z-50 fixed h-screen w-screen bg-white/70 `}
    >
      <h3>Loading</h3>
    </section>
  );
};
