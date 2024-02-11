import {SignIn} from "@clerk/nextjs";

export default function Page() {
  // Inline styles for the container
  const containerStyle = {
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    height : "100vh",
    width : "100vw",
  };
  return (
    <div style={containerStyle}>
      <SignIn />
    </div>
  );
}
