import {
    ReactNode,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";
import GlossaryTooltip from "./GlossaryTooltip";
import { GlossaryHit, resolveTerm } from "./resolve";

const OPEN_DELAY = 300;
const CLOSE_DELAY = 200;

type Active = { anchor: HTMLElement; hit: GlossaryHit };

// Every mounted layer, so opening one closes the rest.
const layers = new Set<() => void>();

export default function GlossaryTooltipLayer({
    children,
}: {
    children: ReactNode;
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<Active | null>(null);
    const openTimer = useRef<ReturnType<typeof setTimeout>>();
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();
    const [active, setActive] = useState<Active | null>(null);
    const tooltipId = useId();

    activeRef.current = active;

    const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);

    const scheduleClose = useCallback(() => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY);
    }, []);

    const close = useCallback(() => {
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        setActive(null);
    }, []);

    const open = useCallback((anchor: HTMLElement) => {
        const hit = resolveTerm(anchor.dataset.kw ?? "");
        if (!hit) return;
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        layers.forEach((closeOther) => closeOther());
        setActive({ anchor, hit });
    }, []);

    useEffect(() => {
        layers.add(close);
        return () => {
            layers.delete(close);
            close();
        };
    }, [close]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const keywordOf = (event: Event) => {
            const target = event.target;
            if (!(target instanceof Element)) return null;
            return target.closest<HTMLElement>(".kw");
        };

        const onPointerOver = (event: Event) => {
            const kw = keywordOf(event);
            if (!kw) return;
            cancelClose();
            if (activeRef.current?.anchor === kw) return;
            clearTimeout(openTimer.current);
            openTimer.current = setTimeout(() => open(kw), OPEN_DELAY);
        };

        const onPointerOut = (event: Event) => {
            if (!keywordOf(event)) return;
            clearTimeout(openTimer.current);
            scheduleClose();
        };

        const onFocusIn = (event: Event) => {
            const kw = keywordOf(event);
            if (kw) open(kw);
        };

        const onFocusOut = (event: Event) => {
            if (keywordOf(event)) scheduleClose();
        };

        // stopPropagation first: the cards put an onClick on the whole card.
        const onClick = (event: Event) => {
            const kw = keywordOf(event);
            if (!kw) return;
            event.stopPropagation();
            open(kw);
        };

        root.addEventListener("pointerover", onPointerOver);
        root.addEventListener("pointerout", onPointerOut);
        root.addEventListener("focusin", onFocusIn);
        root.addEventListener("focusout", onFocusOut);
        root.addEventListener("click", onClick);
        return () => {
            root.removeEventListener("pointerover", onPointerOver);
            root.removeEventListener("pointerout", onPointerOut);
            root.removeEventListener("focusin", onFocusIn);
            root.removeEventListener("focusout", onFocusOut);
            root.removeEventListener("click", onClick);
        };
    }, [cancelClose, open, scheduleClose]);

    return (
        <div ref={rootRef} className="contents">
            {children}
            {active && (
                <GlossaryTooltip
                    anchor={active.anchor}
                    hit={active.hit}
                    tooltipId={tooltipId}
                    onPointerEnter={cancelClose}
                    onPointerLeave={scheduleClose}
                    onDismiss={close}
                    onNavigate={close}
                />
            )}
        </div>
    );
}
