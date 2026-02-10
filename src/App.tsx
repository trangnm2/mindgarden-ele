// KHONG SUA KHI DOI GAME
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./fe/pages/Index";
import NotFound from "./fe/pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mobile" element={<Index forcedDeviceType="mobile" />} />
      <Route path="/desktop" element={<Index forcedDeviceType="desktop" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
