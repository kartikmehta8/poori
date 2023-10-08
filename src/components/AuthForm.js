import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../lib/supabase";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const { user } = supabase.auth.getSession();
        if (user) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleAuth = async (e) => {
        e.preventDefault();
        const { user, error } = isLogin
            ? await supabase.auth.signInWithPassword({ email, password })
            : await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("Error:", error.message);
        } else if (user || !error) {
            router.push("/dashboard");
        }
    };

    return (
        <div>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={handleAuth}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Switch to Sign Up" : "Switch to Login"}
            </button>
        </div>
    );
}
