"use client";

import React, { Fragment, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import {
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UserIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

const navigation = [
    { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
    { name: "Team", href: "#", icon: UsersIcon, current: false },
    { name: "Projects", href: "#", icon: FolderIcon, current: false },
    { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
    { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const settingsNavigation = [
    { name: "Profile", href: "#", icon: UserIcon },
    { name: "Settings", href: "#", icon: Cog6ToothIcon },
    { name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];

interface DashboardLayoutContainerProps {
    children: React.ReactNode;
}

export default function DashboardLayoutContainer({ children }: DashboardLayoutContainerProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarExpand, setSidebarExpand] = useState(false);

    return (
        <>
            <div className={"flex w-screen"}>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul
                                                role="list"
                                                className="flex flex-1 flex-col gap-y-7"
                                            >
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map(item => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={cn(
                                                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                                                        {
                                                                            "bg-gray-800 text-white":
                                                                                item.current,
                                                                            "text-gray-400 hover:bg-gray-800 hover:text-white":
                                                                                !item.current,
                                                                        },
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className="h-6 w-6 shrink-0"
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li className="mt-auto">
                                                    {settingsNavigation.map((item, index) => {
                                                        return (
                                                            <a
                                                                key={index}
                                                                href="#"
                                                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                            >
                                                                <item.icon
                                                                    className="h-6 w-6 shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                        );
                                                    })}
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className={cn("hidden h-screen lg:inset-y-0 lg:z-50 lg:flex lg:flex-col")}>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className={cn(
                            "flex w-20 grow flex-col gap-y-5 overflow-hidden overflow-y-auto bg-gray-900 px-6 pb-4",
                            {
                                "w-[24rem]": sidebarExpand,
                            },
                        )}
                        style={{
                            transition: "0.5s",
                        }}
                    >
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map(item => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={cn(
                                                        "px-auto group flex w-full items-center gap-x-3 overflow-hidden rounded-md p-2 px-3 text-sm font-semibold leading-6 transition",
                                                        {
                                                            "bg-gray-800 text-white": item.current,
                                                            "text-gray-400 hover:bg-gray-800 hover:text-white":
                                                                !item.current,
                                                            "w-full": sidebarExpand,
                                                        },
                                                    )}
                                                >
                                                    <item.icon
                                                        className="h-6 w-6 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <ul className="-mx-2 space-y-1">
                                        <button
                                            type={"button"}
                                            onClick={() => setSidebarExpand(old => !old)}
                                            className="flex w-full items-center gap-x-3 rounded-md p-2 px-3 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                        >
                                            <Bars3Icon
                                                className="h-6 w-6 shrink-0"
                                                aria-hidden="true"
                                            />
                                        </button>
                                        {settingsNavigation.map((item, index) => {
                                            return (
                                                <li key={index} className={"my-2"}>
                                                    <a
                                                        href="#"
                                                        className="flex w-full items-center gap-x-3 rounded-md p-2 px-3 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    >
                                                        <item.icon
                                                            className="h-6 w-6 shrink-0"
                                                            aria-hidden="true"
                                                        />
                                                        {sidebarExpand && item.name}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="w-full">
                    <div className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:hidden lg:px-8">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
