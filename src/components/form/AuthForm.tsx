"use client";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import { useState } from "react";
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-300">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md">
        {/* Tab chuyển qua lại */}
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-lg font-semibold transition-all
              ${
                isLogin
                  ? "bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow"
                  : "bg-transparent text-blue-600 hover:bg-blue-100"
              }`}
            onClick={() => setIsLogin(true)}
          >
            Đăng nhập
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-semibold transition-all 
              ${
                !isLogin
                  ? "bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow"
                  : "bg-transparent text-blue-600 hover:bg-blue-100"
              }`}
            onClick={() => setIsLogin(false)}
          >
            Đăng ký
          </button>
        </div>

        {/* Nội dung form */}
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
}
