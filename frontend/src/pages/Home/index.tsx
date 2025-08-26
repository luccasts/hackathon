import children from "../../assets/hug-children.png";

export default function Home() {
  return (
    <div className="bg-background bg-[url('/assets/img/background-home.png')]">
      <h1>Página Home</h1>
      <img className="w-3xs" src={children} alt="" />
    </div>
  );
}
