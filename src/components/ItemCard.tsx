import { StyleSheet, Text, View } from "react-native";
type Props = {
	title: string;
	place: string;
};
export default function ItemCard({ title, place }: Props) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.place}>📍 {place}</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	card: {
		backgroundColor: "#ffffff",
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
	},
	place: {
		marginTop: 4,
		color: "#6b7280",
	},
});
