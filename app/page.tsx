// メインページ
import { getAuthSession, UserType } from "@/lib/nextauth";
import Home from "@/components/home/Home";


const HomePage = async () => {
  const user = await getAuthSession();

  return <Home user={user} />;
}

export default HomePage;