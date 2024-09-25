"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
} from "@/components/ui/drawer";

type DrawerDialogProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    disableConfirm?: boolean;
    disableCancel?: boolean;
    closeOnConfirm?: boolean;
    onConfirm?: (close: () => void) => unknown;
    onCancel?: () => unknown;
};
export default function ConfirmDialog({
    children,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    disableConfirm,
    disableCancel,
    closeOnConfirm = true,
    onConfirm,
    onCancel,
}: DrawerDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    function handleConfirm() {
        onConfirm?.(() => setIsOpen(false));
        if (closeOnConfirm) {
            setIsOpen(false);
        }
    }

    function handleCancel() {
        setIsOpen(false);
        onCancel?.();
    }

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={disableCancel}
                            >
                                {cancelText}
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={handleConfirm}
                            disabled={disableConfirm}
                        >
                            {confirmText}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <Button
                        type="button"
                        onClick={handleConfirm}
                        disabled={disableConfirm}
                    >
                        {confirmText}
                    </Button>
                    <DrawerClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={disableCancel}
                        >
                            {cancelText}
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
