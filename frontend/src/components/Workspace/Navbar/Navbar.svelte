<script lang="ts">
    import NavbarItem from "@/components/Workspace/Navbar/NavbarItem.svelte";
    import {
        BookOpenText,
        Search,
        Sigma,
        TextSelect,
        LibraryBig,
        NotepadText,
    } from "lucide-svelte";
    import {
        workspace_mode,
        workspace_version,
        workspace_currentRef,
    } from "@/lib/stores";
    import { refToString } from "@/lib/Scripture/ref";
    import { EventsEmit } from "!wails/runtime/runtime";
    import { graphe_settings, workspace_sidebar } from "@/lib/stores";

    export let navFloating = true;
    let width: number;

    const BREAKPOINTS = [
        {
            value: 50,
            text: 400,
            nav: 350,
        },
        {
            value: 70,
            text: 500,
            nav: 385,
        },
        {
            value: 90,
            text: 600,
            nav: 450,
        },
        {
            value: 110,
            text: 680,
            nav: 520,
        },
        {
            value: 130,
            text: 760,
            nav: 590,
        },
        {
            value: 150,
            text: 850,
            nav: 640,
        },
        {
            value: 170,
            text: 910,
            nav: 700,
        },
        {
            value: 190,
            text: 1030,
            nav: 790,
        },
    ] as const;

    function getBreakpoint(zoom: number, type: "text" | "nav"): number {
        let curr: number;
        for (let i = 0; i < BREAKPOINTS.length; i++) {
            if (zoom >= BREAKPOINTS[i].value) {
                curr = BREAKPOINTS[i][type];
            } else break;
        }
        return curr;
    }

    $: navBreakpoint = getBreakpoint($graphe_settings.appearence.zoom, "nav");
    $: textBreakpoint = getBreakpoint($graphe_settings.appearence.zoom, "text");
    $: navFloating = width > navBreakpoint;
</script>

<div id="navbar" class:topbar={width <= navBreakpoint} bind:clientWidth={width}>
    <div class="container">
        <div class="wrapper wrapper-nav">
            <NavbarItem
                icon={TextSelect}
                text={width > textBreakpoint ? "passage" : ""}
                on:click={() => EventsEmit("window:workspace:mode", "passage")}
                tooltip="Passage Mode"
                command={$graphe_settings.shortcuts.passageMode}
                selected={$workspace_mode == "passage"}
            />

            <NavbarItem
                icon={Search}
                text={width > textBreakpoint ? "search" : ""}
                on:click={() => EventsEmit("window:workspace:mode", "search")}
                tooltip="Search Mode"
                command={$graphe_settings.shortcuts.searchMode}
                selected={$workspace_mode == "search"}
            />

            <div class="separator"></div>

            <NavbarItem
                icon={LibraryBig}
                text={$workspace_version}
                on:click={() => EventsEmit("window:workspace:modal", "version")}
                tooltip="Choose Version"
                command={$graphe_settings.shortcuts.chooseVersion}
            />

            <NavbarItem
                icon={BookOpenText}
                text={$workspace_version && $workspace_currentRef
                    ? refToString(
                          $workspace_version,
                          $workspace_currentRef,
                          "chapter",
                      )
                    : ""}
                on:click={() => EventsEmit("window:workspace:modal", "text")}
                tooltip="Choose Text"
                command={$graphe_settings.shortcuts.chooseText}
                disabled={$workspace_mode == "search"}
            />

            <div class="separator"></div>

            <NavbarItem
                icon={Sigma}
                on:click={() =>
                    EventsEmit("window:workspace:modal", "functions")}
                tooltip="Functions"
                command={$graphe_settings.shortcuts.openFunctions}
            />

            <NavbarItem
                icon={NotepadText}
                on:click={() => EventsEmit("window:workspace:sidebar")}
                tooltip="Analytics"
                command={$graphe_settings.shortcuts.openAnalytics}
                selected={$workspace_sidebar}
            />
        </div>
    </div>

    <div class="navbar-fade"></div>
</div>

<style>
    #navbar {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        user-select: none;
        -webkit-user-select: none;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1.2rem;
        background: red;
    }

    .wrapper-nav {
        height: min(2rem, 85%);
        background: var(--clr-background-sub);
        border-radius: 0.4rem;
        padding: 0 1.8em;
    }

    .separator {
        height: 1rem;
        width: 0.1ch;
        background: var(--clr-text-sub);
    }

    .navbar-fade {
        --size-fade-height: 20px;
        position: absolute;
        width: 90vw;
        height: var(--size-fade-height);
        right: 5vw;
        bottom: calc(-1 * var(--size-fade-height));
        background: linear-gradient(
            180deg,
            var(--clr-background) 30%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;
        pointer-events: none;
    }

    #navbar.topbar {
        background: red;
        background: var(--clr-background-sub);
        padding-block: 0;
    }

    #navbar.topbar .container {
        justify-content: flex-start;
        padding-left: 1vw;
    }

    #navbar.topbar .wrapper-nav {
        padding: 0;
        padding-inline: 0.2rem;
        gap: 0.5rem;
    }
</style>
