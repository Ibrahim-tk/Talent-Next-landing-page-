"use client";

import Link from "next/link";
import { useState, type ComponentType } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Archive02Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Delete02Icon,
  DashboardSquare01Icon,
  File01Icon,
  FilterHorizontalIcon,
  HelpCircleIcon,
  InboxIcon,
  KeyboardIcon,
  Mail01Icon,
  Menu01Icon,
  Message01Icon,
  MoreVerticalIcon,
  PencilEdit02Icon,
  PlusSignIcon,
  PrinterIcon,
  RefreshIcon,
  Search01Icon,
  SentIcon,
  Settings01Icon,
  SparklesIcon,
  SquareIcon,
  StarIcon,
  Tag01Icon,
  UserIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";

import { AdminInviteEmail } from "../welcome/AdminInviteEmail";
import { AdminOtpEmail } from "../welcome/AdminOtpEmail";
import { CourseEnrolledEmail } from "../welcome/CourseEnrolledEmail";
import { PasswordResetOtpEmail } from "../welcome/PasswordResetOtpEmail";
import { TalentLevelEmail } from "../welcome/TalentLevelEmail";
import { WelcomeEmail } from "../welcome/WelcomeEmail";

import styles from "./Inbox.module.css";

/**
 * A dummy webmail client, laid out one-for-one on the familiar inbox
 * (app rail, folder list, toolbar, rows, side panel, reading view) so the
 * transactional templates can be judged where they will really be read.
 * The marks are ours — the TALENTnext logo stands where a mail product's
 * would — and the filler senders are invented, so nothing here passes for
 * someone else's product or someone's real mail.
 *
 * Our templates render straight into the page — no iframe — so a button in
 * an email (the welcome mail's "Set your password") takes the whole window
 * to its link, the way clicking it in a real inbox would.
 */

type Message = {
  id: string;
  sender: string;
  address: string;
  subject: string;
  snippet: string;
  time: string;
  unread: boolean;
  Template?: ComponentType;
};

const TN = { sender: "TALENTnext", address: "hello@talentnext.com" };

/* Newest first. Ours sit at the top — the welcome mail is the one the quiz
   just sent — and the filler below makes it read as a lived-in inbox. */
const MESSAGES: Message[] = [
  { id: "level", ...TN, subject: "Your Talent Level is in: Explorer E3", snippet: "Thanks for your conversation with your TALENTnext Agent. You're on the Explorer track at E3.", time: "6:02 PM", unread: true, Template: TalentLevelEmail },
  { id: "course", ...TN, subject: "You're enrolled: Leading Through Change", snippet: "You're confirmed. The course starts Monday, October 12 — here are the details.", time: "5:48 PM", unread: true, Template: CourseEnrolledEmail },
  { id: "welcome", ...TN, subject: "Welcome to TALENTnext — your results are ready", snippet: "Thanks for taking the diagnostic. Set your password to open your results and next steps.", time: "5:20 PM", unread: true, Template: WelcomeEmail },
  { id: "reset", ...TN, subject: "Your TALENTnext password reset code", snippet: "Use this code to reset your password. It expires shortly, so use it soon.", time: "2:15 PM", unread: true, Template: PasswordResetOtpEmail },
  { id: "admin-otp", ...TN, subject: "Your TALENTnext admin sign-in code", snippet: "Here is the one-time code for your super admin sign-in.", time: "Sep 30", unread: true, Template: AdminOtpEmail },
  { id: "invite", ...TN, subject: "You've been invited to TALENTnext admin", snippet: "You have been added as an admin. Set your password within 7 days to get started.", time: "Sep 30", unread: true, Template: AdminInviteEmail },
  { id: "f1", sender: "Product Weekly", address: "digest@example.com", subject: "Five patterns from this week's launches", snippet: "Onboarding checklists, empty states that sell, and a pricing page worth stealing from.", time: "Sep 30", unread: false },
  { id: "f2", sender: "Sara Malik", address: "sara@example.com", subject: "Re: Thursday review", snippet: "Works for me — I'll bring the updated flows and we can walk the results page together.", time: "Sep 29", unread: true },
  { id: "f3", sender: "People Team", address: "people@example.com", subject: "Reminder: submit your timesheet", snippet: "Please make sure this month's hours are in by Friday so payroll can run on time.", time: "Sep 29", unread: false },
  { id: "f4", sender: "Calendar", address: "calendar@example.com", subject: "Invitation: Design sync @ Wed 3:30 PM", snippet: "You have been invited to a recurring event. Join with the link in the invite.", time: "Sep 28", unread: false },
  { id: "f5", sender: "Ahmed Raza", address: "ahmed@example.com", subject: "Copy for the quiz questions", snippet: "Attached the final copy for all twelve questions — shout if anything reads off.", time: "Sep 28", unread: true },
  { id: "f6", sender: "Design Digest", address: "news@example.com", subject: "Type scales that hold up on mobile", snippet: "Why a 1.25 ratio keeps headings honest, and when to break it.", time: "Sep 27", unread: false },
  { id: "f7", sender: "IT Helpdesk", address: "it@example.com", subject: "Scheduled maintenance this weekend", snippet: "Email and VPN will be briefly unavailable between 2 and 4 AM on Sunday.", time: "Sep 26", unread: false },
  { id: "f8", sender: "Hina Shah", address: "hina@example.com", subject: "Photos from the offsite", snippet: "Uploaded everything to the shared folder — the sunset ones came out great.", time: "Sep 25", unread: false },
];

const FOLDERS: { id: string; label: string; icon: IconSvgElement; caret?: boolean }[] = [
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "starred", label: "Starred", icon: StarIcon },
  { id: "snoozed", label: "Snoozed", icon: Clock01Icon },
  { id: "sent", label: "Sent", icon: SentIcon },
  { id: "drafts", label: "Drafts", icon: File01Icon },
  { id: "categories", label: "Categories", icon: Tag01Icon, caret: true },
  { id: "more", label: "More", icon: ArrowDown01Icon },
];

function Ico({ icon, size = 20 }: { icon: IconSvgElement; size?: number }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.5} />;
}

function IconButton({ icon, label, onClick }: { icon: IconSvgElement; label: string; onClick?: () => void }) {
  return (
    <button type="button" className={styles.iconButton} aria-label={label} title={label} onClick={onClick}>
      <Ico icon={icon} />
    </button>
  );
}

export function Inbox() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [unread, setUnread] = useState<Set<string>>(
    () => new Set(MESSAGES.filter((m) => m.unread).map((m) => m.id)),
  );
  const [starred, setStarred] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const open = MESSAGES.find((m) => m.id === openId);

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const openMessage = (id: string) => {
    setOpenId(id);
    setUnread((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const allChecked = checked.size === MESSAGES.length;

  return (
    <div className={styles.client}>
      {/* ---- Top bar ------------------------------------------------- */}
      <header className={styles.topBar}>
        <div className={styles.brandCell}>
          <IconButton icon={Menu01Icon} label="Main menu" />
          <Link href="/" className={styles.brand}>
            <span className={styles.logo} aria-hidden="true">G</span>
            <span className={styles.brandTag}>Mail</span>
          </Link>
        </div>

        <label className={styles.search}>
          <Ico icon={Search01Icon} />
          <input type="search" placeholder="Search mail" aria-label="Search mail" />
          <span className={styles.searchFilter}>
            <Ico icon={FilterHorizontalIcon} />
          </span>
        </label>

        <div className={styles.topActions}>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            <Ico icon={ArrowDown01Icon} size={16} />
          </span>
          <IconButton icon={HelpCircleIcon} label="Support" />
          <IconButton icon={Settings01Icon} label="Settings" />
          <IconButton icon={SparklesIcon} label="Assistant" />
          <IconButton icon={DashboardSquare01Icon} label="Apps" />
          <span className={styles.account}>
            <img src="/img/talentnext-logo-black.svg" alt="" className={styles.accountLogo} />
            <span className={styles.avatar}>M</span>
          </span>
        </div>
      </header>

      {/* ---- App rail ------------------------------------------------ */}
      <nav className={styles.rail} aria-label="Apps">
        <button type="button" className={`${styles.railItem} ${styles.railActive}`}>
          <span className={styles.railIcon}>
            <Ico icon={Mail01Icon} />
            <span className={styles.railBadge}>{unread.size}</span>
          </span>
          Mail
        </button>
        <button type="button" className={styles.railItem}>
          <span className={styles.railIcon}>
            <Ico icon={Message01Icon} />
          </span>
          Chat
        </button>
        <button type="button" className={styles.railItem}>
          <span className={styles.railIcon}>
            <Ico icon={Video01Icon} />
          </span>
          Meet
        </button>
      </nav>

      {/* ---- Folders ------------------------------------------------- */}
      <aside className={styles.sidebar}>
        <button type="button" className={styles.compose}>
          <Ico icon={PencilEdit02Icon} size={22} />
          Compose
        </button>
        {FOLDERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.folder} ${f.id === "inbox" ? styles.folderActive : ""}`}
            onClick={() => f.id === "inbox" && setOpenId(null)}
          >
            <span className={styles.folderCaret}>{f.caret ? "▸" : ""}</span>
            <Ico icon={f.icon} />
            <span>{f.label}</span>
            {f.id === "inbox" && unread.size > 0 && <span className={styles.count}>{unread.size}</span>}
          </button>
        ))}
        <div className={styles.labels}>
          <span>Labels</span>
          <IconButton icon={PlusSignIcon} label="Create new label" />
        </div>
      </aside>

      {/* ---- Main pane ----------------------------------------------- */}
      <main className={styles.pane}>
        {!open && (
          <>
            <div className={styles.toolbar}>
              <span className={styles.selectAll}>
                <button
                  type="button"
                  className={styles.checkbox}
                  aria-label="Select all"
                  aria-pressed={allChecked}
                  onClick={() => setChecked(allChecked ? new Set() : new Set(MESSAGES.map((m) => m.id)))}
                >
                  <Ico icon={allChecked ? CheckmarkCircle02Icon : SquareIcon} size={18} />
                </button>
                <Ico icon={ArrowDown01Icon} size={14} />
              </span>
              <IconButton icon={RefreshIcon} label="Refresh" />
              <IconButton icon={MoreVerticalIcon} label="More" />
              <span className={styles.pager}>
                1–{MESSAGES.length} of {MESSAGES.length}
                <IconButton icon={ArrowLeft01Icon} label="Newer" />
                <IconButton icon={ArrowRight01Icon} label="Older" />
                <span className={styles.keyboard}>
                  <Ico icon={KeyboardIcon} size={18} />
                  <Ico icon={ArrowDown01Icon} size={12} />
                </span>
              </span>
            </div>

            <ul className={styles.list}>
              {MESSAGES.map((m) => {
                const isUnread = unread.has(m.id);
                return (
                  <li
                    key={m.id}
                    className={`${styles.row} ${isUnread ? styles.unread : ""} ${checked.has(m.id) ? styles.rowChecked : ""}`}
                    onClick={() => openMessage(m.id)}
                  >
                    <button
                      type="button"
                      className={styles.checkbox}
                      aria-label={`Select ${m.subject}`}
                      aria-pressed={checked.has(m.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setChecked((prev) => toggle(prev, m.id));
                      }}
                    >
                      <Ico icon={checked.has(m.id) ? CheckmarkCircle02Icon : SquareIcon} size={18} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.star} ${starred.has(m.id) ? styles.starOn : ""}`}
                      aria-label={starred.has(m.id) ? "Starred" : "Not starred"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setStarred((prev) => toggle(prev, m.id));
                      }}
                    >
                      <Ico icon={StarIcon} size={18} />
                    </button>
                    <span className={styles.rowSender}>{m.sender}</span>
                    <span className={styles.rowBody}>
                      <span className={styles.rowSubject}>{m.subject}</span>
                      <span className={styles.rowSnippet}> - {m.snippet}</span>
                    </span>
                    <span className={styles.rowTime}>{m.time}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {open && (
          <article className={styles.reader}>
            <div className={styles.toolbar}>
              <IconButton icon={ArrowLeft02Icon} label="Back to Inbox" onClick={() => setOpenId(null)} />
              <IconButton icon={Archive02Icon} label="Archive" />
              <IconButton icon={Delete02Icon} label="Delete" />
              <span className={styles.toolDivider} />
              <IconButton
                icon={Mail01Icon}
                label="Mark as unread"
                onClick={() => {
                  setUnread((prev) => new Set(prev).add(open.id));
                  setOpenId(null);
                }}
              />
              <IconButton icon={Clock01Icon} label="Snooze" />
              <IconButton icon={MoreVerticalIcon} label="More" />
              <span className={styles.pager}>
                {MESSAGES.indexOf(open) + 1} of {MESSAGES.length}
                <IconButton icon={ArrowLeft01Icon} label="Newer" />
                <IconButton icon={ArrowRight01Icon} label="Older" />
              </span>
            </div>

            <div className={styles.subjectRow}>
              <h1 className={styles.subject}>{open.subject}</h1>
              <span className={styles.chip}>Inbox ×</span>
              <span className={styles.subjectActions}>
                <IconButton icon={PrinterIcon} label="Print all" />
              </span>
            </div>

            <div className={styles.meta}>
              <span className={styles.senderAvatar} aria-hidden="true">
                {open.sender.charAt(0)}
              </span>
              <div className={styles.metaText}>
                <span>
                  <strong>{open.sender}</strong>{" "}
                  <span className={styles.address}>&lt;{open.address}&gt;</span>
                </span>
                <span className={styles.address}>to me ▾</span>
              </div>
              <span className={styles.metaRight}>
                <span className={styles.address}>{open.time}</span>
                <IconButton icon={StarIcon} label="Star" />
                <IconButton icon={ArrowTurnBackwardIcon} label="Reply" />
                <IconButton icon={MoreVerticalIcon} label="More" />
              </span>
            </div>

            <div className={styles.body}>
              {open.Template ? (
                <div key={open.id} className={styles.emailSheet}>
                  <open.Template />
                </div>
              ) : (
                <p className={styles.plainBody}>
                  Hi,
                  <br />
                  <br />
                  {open.snippet}
                  <br />
                  <br />
                  Thanks,
                  <br />
                  {open.sender}
                </p>
              )}

              <div className={styles.replyRow}>
                <button type="button" className={styles.replyButton}>
                  <Ico icon={ArrowTurnBackwardIcon} size={18} />
                  Reply
                </button>
                <button type="button" className={styles.replyButton}>
                  <Ico icon={ArrowTurnForwardIcon} size={18} />
                  Forward
                </button>
              </div>
            </div>
          </article>
        )}
      </main>

      {/* ---- Side panel ---------------------------------------------- */}
      <aside className={styles.sidePanel} aria-label="Side panel">
        <IconButton icon={Calendar03Icon} label="Calendar" />
        <IconButton icon={PencilEdit02Icon} label="Notes" />
        <IconButton icon={CheckmarkCircle02Icon} label="Tasks" />
        <IconButton icon={UserIcon} label="Contacts" />
      </aside>
    </div>
  );
}
