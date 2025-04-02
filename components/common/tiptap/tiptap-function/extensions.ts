import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';

export const getExtensions = (placeholder: string = '내용을 입력하세요...') => [
  StarterKit,
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  Link.configure({
    openOnClick: false,
    validate: (href) => /^https?:\/\//.test(href),
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
  Underline,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  Placeholder.configure({
    placeholder,
    emptyEditorClass: 'is-editor-empty',
    showOnlyWhenEditable: true,
    showOnlyCurrent: false,
  }),
];

export default getExtensions;
