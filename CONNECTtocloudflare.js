(function (Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("This extension must run unsandboxed.");
    }

    class EmailSender {
        getInfo() {
            return {
                id: "emailSender",
                name: "Email Sender",
                blocks: [
                    {
                        opcode: "sendEmail",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "send email to [TO] with subject [SUBJECT] and message [BODY]",
                        arguments: {
                            TO: { type: Scratch.ArgumentType.STRING },
                            SUBJECT: { type: Scratch.ArgumentType.STRING },
                            BODY: { type: Scratch.ArgumentType.STRING }
                        }
                    }
                ]
            };
        }

        async sendEmail(args) {
            const payload = {
                to: args.TO,
                subject: args.SUBJECT,
                body: args.BODY
            };

            try {
                await fetch("https://orange-water-431c.jacobmajor162.workers.dev", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
            } catch (e) {
                console.error("Email failed:", e);
            }
        }
    }

    Scratch.extensions.register(new EmailSender());
})(Scratch);
