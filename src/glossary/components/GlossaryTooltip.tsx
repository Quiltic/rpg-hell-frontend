import { useEffect } from "react";
import {
    FloatingPortal,
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useInteractions,
} from "@floating-ui/react";
import { GlossaryHit } from "../resolve";
import { titleCase } from "../../util/textFormatting";
import Pill from "../../components/ui/Pill";
import GlossaryDefinition from "./GlossaryDefinition";

// Component rendered only by GlossaryTooltipLayer

type Props = {
    anchor: HTMLElement;
    hit: GlossaryHit;
    tooltipId: string;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
    onDismiss: () => void;
    onNavigate: () => void;
};

export default function GlossaryTooltip({
    anchor,
    hit,
    tooltipId,
    onPointerEnter,
    onPointerLeave,
    onDismiss,
    onNavigate,
}: Props) {
    const { refs, floatingStyles, context } = useFloating({
        open: true,
        onOpenChange: (open) => {
            if (!open) onDismiss();
        },
        placement: "bottom",
        middleware: [offset(0), flip(), shift({ padding: 8 })],
        whileElementsMounted: autoUpdate,
        elements: { reference: anchor },
    });

    const dismiss = useDismiss(context, { outsidePressEvent: "pointerdown" });
    const { getFloatingProps } = useInteractions([dismiss]);

    const label = hit.source.label(hit.record);

    useEffect(() => {
        anchor.setAttribute("aria-describedby", tooltipId);
        return () => anchor.removeAttribute("aria-describedby");
    }, [anchor, tooltipId]);

    return (
        <FloatingPortal>
            <div
                ref={refs.setFloating}
                style={floatingStyles}
                className="z-50 p-2 print:hidden"
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                {...getFloatingProps()}
            >
                <div
                    id={tooltipId}
                    role="tooltip"
                    className="w-80 max-w-[calc(100vw-1.5rem)] rounded border-2 border-solid border-body-700/20 bg-dark-400 px-3 py-2 text-left shadow-lg"
                >
                    <div className="flex items-baseline justify-between gap-2">
                        <span className="font-bold">{titleCase(hit.record.name)}</span>
                        <Pill colorClassName={hit.source.pillColor(hit.record)}>{label}</Pill>
                    </div>

                    <GlossaryDefinition
                        hit={hit}
                        onNavigate={onNavigate}
                    />
                </div>
            </div>
        </FloatingPortal>
    );
}
