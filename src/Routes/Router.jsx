import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import Landing from "../Pages/Landing";
import Ens from "../Pages/Ens";
import Category from "../Pages/Category";
import Domain from "../Pages/Domain";

const RouterInit = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/ens/:name" element={<Ens />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/domain/:tokenId" element={<Domain />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterInit;
