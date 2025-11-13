import ChatUiClient from "@/src/component/ChatUi";

export default async function ChatUi({ params }) {
  const { slug } = await params; // ✅ required now
  return <ChatUiClient slug={slug} />;
}
