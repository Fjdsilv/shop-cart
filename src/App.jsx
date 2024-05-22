import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useGlobalContext } from "./context/Context";

const App = () => {
  const { isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <main>
        <div 
          className="loading" 
          style={{marginTop: "10rem"}} 
        />
      </main>
    );
  }
  return (
    <main>
      <Navbar/>
      <CartContainer/>
    </main>
  )
}
export default App