import { Toaster, ToastBar } from "react-hot-toast";
import { cn } from "../../styling/utilites";

// eslint-disable-next-line react-refresh/only-export-components
export { toast } from "react-hot-toast";

/**
 * Site-wide toast container, mounted once in `RootLayout`. A per-toast `className` is merged onto the dark base style.
 * @example
 * ```tsx
 * toast.success("Saved!", { className: "ring-2 ring-soul-500" });
 * ```
 */
export default function AppToaster() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{ duration: 2500 }}
        >
            {(t) => (
                <ToastBar
                    toast={{
                        ...t,
                        className: cn("!bg-dark-300 !text-light whitespace-pre-line rounded-md", t.className),
                    }}
                />
            )}
        </Toaster>
    );
}
