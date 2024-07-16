// Import basic dependencies
import { createReadStream, ReadStream } from "fs";
import { join } from "path";
import absolutePath from "./pathUtil";

// Read view file and export
export default function(
	name: string,
	path: string = absolutePath("./public/html/")
): ReadStream {
	return createReadStream(join(path, `${name}.html`));
}
