import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Home } from "@/pages/Home";
import NotFound from "@/pages/not-found";
function Router() {
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { component: NotFound })] }));
}
function App() {
    return (_jsx(ThemeProvider, { defaultTheme: "light", storageKey: "ricepred-theme", children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Router, {})] }) }));
}
export default App;
