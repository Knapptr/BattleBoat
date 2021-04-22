import { MessageWrapper, Text } from "./styles/components";
export const MessageBar = ({ message }) => {
    return (
        <MessageWrapper>
            <Text>{message}</Text>
        </MessageWrapper>
    );
};
