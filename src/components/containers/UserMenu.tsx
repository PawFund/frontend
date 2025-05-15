import { useAppKit } from "@reown/appkit/react";
import { useDisconnect } from "wagmi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { HeartHandshake, LogOut, Plus, User, Wallet } from "lucide-react";

export function UserMenu({ open, onOpenChange, trigger }: { open?: boolean, onOpenChange?: (open: boolean) => void, trigger?: React.ReactNode }) {
    const { disconnect } = useDisconnect();
    const appKit = useAppKit();

    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild >
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-gray-100 rounded-xl w-60 top-7">
                <DropdownMenuItem >
                    <div className="py-3 w-full border border-gray-300 flex items-center justify-center gap-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-all">
                        <Plus className="text-neutral-800" strokeWidth={2} />
                        <span>Create Campaign</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem >
                    <div className="text-base flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-4 py-2 transition-all w-full rounded-md">
                        <User className="text-neutral-800" strokeWidth={2} />
                        <span>Account</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => appKit.open()}>
                    <div className="text-base flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-4 py-2 transition-all w-full rounded-md">
                        <Wallet className="text-neutral-800" strokeWidth={2} />
                        <span>My Wallet</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div className="text-base flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-4 py-2 transition-all w-full rounded-md">
                        <HeartHandshake className="text-neutral-800" strokeWidth={2} />
                        <span>My Campaign</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => disconnect()}>
                    <div className="text-base flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-4 py-2 transition-all w-full rounded-md">
                        <LogOut className="text-neutral-800" strokeWidth={2} />
                        <span>Log Out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}