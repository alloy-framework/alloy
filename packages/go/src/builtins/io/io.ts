import { createModule, StrictDescriptor } from "../../create-module.js";

export const io = createModule(
  "io",
  {
    kind: "package",
    members: {
      fs: {
        kind: "package",
        members: {
          ErrInvalid: { kind: "var" },
          ErrPermission: { kind: "var" },
          ErrExist: { kind: "var" },
          ErrNotExist: { kind: "var" },
          ErrClosed: { kind: "var" },
          SkipAll: { kind: "var" },
          SkipDir: { kind: "var" },
          FormatDirEntry: { kind: "function" },
          FormatFileInfo: { kind: "function" },
          Glob: { kind: "function" },
          ReadFile: { kind: "function" },
          ReadLink: { kind: "function" },
          ValidPath: { kind: "function" },
          WalkDir: { kind: "function" },
          DirEntry: {
            kind: "interface",
            members: {
              Name: { kind: "field" },
              IsDir: { kind: "field" },
              Type: { kind: "field" },
              Info: { kind: "field" },
            },
          },
          FileInfoToDirEntry: { kind: "function" },
          ReadDir: { kind: "function" },
          FS: {
            kind: "interface",
            members: {
              Open: { kind: "field" },
            },
          },
          Sub: { kind: "function" },
          File: {
            kind: "interface",
            members: {
              Stat: { kind: "field" },
              Read: { kind: "field" },
              Close: { kind: "field" },
            },
          },
          FileInfo: {
            kind: "interface",
            members: {
              Name: { kind: "field" },
              Size: { kind: "field" },
              Mode: { kind: "field" },
              ModTime: { kind: "field" },
              IsDir: { kind: "field" },
              Sys: { kind: "field" },
            },
          },
          Lstat: { kind: "function" },
          Stat: { kind: "function" },
          FileMode: {
            kind: "type",
            members: {
              IsDir: { kind: "method" },
              IsRegular: { kind: "method" },
              Perm: { kind: "method" },
              String: { kind: "method" },
              Type: { kind: "method" },
            },
          },
          GlobFS: {
            kind: "interface",
            members: {
              FS: { kind: "embed", type: () => ioRef.fs.FS },
              Glob: { kind: "field" },
            },
          },
          PathError: {
            kind: "struct",
            members: {
              Op: { kind: "field" },
              Path: { kind: "field" },
              Err: { kind: "field" },
              Error: { kind: "method" },
              Timeout: { kind: "method" },
              Unwrap: { kind: "method" },
            },
          },
          ReadDirFS: {
            kind: "interface",
            members: {
              FS: { kind: "embed", type: () => ioRef.fs.FS },
              ReadDir: { kind: "field" },
            },
          },
          ReadDirFile: {
            kind: "interface",
            members: {
              File: { kind: "embed", type: () => ioRef.fs.File },
              ReadDir: { kind: "field" },
            },
          },
          ReadFileFS: {
            kind: "interface",
            members: {
              FS: { kind: "embed", type: () => ioRef.fs.FS },
              ReadFile: { kind: "field" },
            },
          },
          ReadLinkFS: {
            kind: "interface",
            members: {
              FS: { kind: "embed", type: () => ioRef.fs.FS },
              ReadLink: { kind: "field" },
              Lstat: { kind: "field" },
            },
          },
          StatFS: {
            kind: "interface",
            members: {
              FS: { kind: "embed", type: () => ioRef.fs.FS },
              Stat: { kind: "field" },
            },
          },
          SubFS: {
            kind: "interface",
            members: {
              FS: { kind: "embed", type: () => ioRef.fs.FS },
              Sub: { kind: "field" },
            },
          },
          WalkDirFunc: { kind: "function" },
        },
      },
      // ioutil is deprecated
      SeekStart: { kind: "var" },
      SeekCurrent: { kind: "var" },
      SeekEnd: { kind: "var" },
      EOF: { kind: "var" },
      ErrClosedPipe: { kind: "var" },
      ErrNoProgress: { kind: "var" },
      ErrShortBuffer: { kind: "var" },
      ErrShortWrite: { kind: "var" },
      ErrUnexpectedEOF: { kind: "var" },
      Copy: { kind: "function" },
      CopyBuffer: { kind: "function" },
      CopyN: { kind: "function" },
      Pipe: { kind: "function" },
      ReadAll: { kind: "function" },
      ReadAtLeast: { kind: "function" },
      ReadFull: { kind: "function" },
      WriteString: { kind: "function" },
      ByteReader: {
        kind: "interface",
        members: {
          ReadByte: { kind: "field" },
        },
      },
      ByteScanner: {
        kind: "interface",
        members: {
          ByteReader: { kind: "embed", type: () => ioRef.ByteReader },
          UnreadByte: { kind: "field" },
        },
      },
      ByteWriter: {
        kind: "interface",
        members: {
          WriteByte: { kind: "field" },
        },
      },
      Closer: {
        kind: "interface",
        members: {
          Close: { kind: "field" },
        },
      },
      LimitedReader: {
        kind: "struct",
        members: {
          R: { kind: "field" },
          N: { kind: "field" },
          Read: { kind: "method" },
        },
      },
      OffsetWriter: {
        kind: "struct",
        members: {
          Seek: { kind: "method" },
          Write: { kind: "method" },
          WriteAt: { kind: "method" },
        },
      },
      NewOffsetWriter: { kind: "function" },
      PipeReader: {
        kind: "struct",
        members: {
          Close: { kind: "method" },
          CloseWithError: { kind: "method" },
          Read: { kind: "method" },
        },
      },
      PipeWriter: {
        kind: "struct",
        members: {
          Close: { kind: "method" },
          CloseWithError: { kind: "method" },
          Write: { kind: "method" },
        },
      },
      ReadCloser: {
        kind: "interface",
        members: {
          Reader: { kind: "embed", type: () => ioRef.Reader },
          Closer: { kind: "embed", type: () => ioRef.Closer },
        },
      },
      NopCloser: { kind: "function" },
      ReadSeekCloser: {
        kind: "interface",
        members: {
          Reader: { kind: "embed", type: () => ioRef.Reader },
          Seeker: { kind: "embed", type: () => ioRef.Seeker },
          Closer: { kind: "embed", type: () => ioRef.Closer },
        },
      },
      ReadSeeker: {
        kind: "interface",
        members: {
          Reader: { kind: "embed", type: () => ioRef.Reader },
          Seeker: { kind: "embed", type: () => ioRef.Seeker },
        },
      },
      ReadWriteCloser: {
        kind: "interface",
        members: {
          Reader: { kind: "embed", type: () => ioRef.Reader },
          Writer: { kind: "embed", type: () => ioRef.Writer },
          Closer: { kind: "embed", type: () => ioRef.Closer },
        },
      },
      ReadWriteSeeker: {
        kind: "interface",
        members: {
          Reader: { kind: "embed", type: () => ioRef.Reader },
          Writer: { kind: "embed", type: () => ioRef.Writer },
          Seeker: { kind: "embed", type: () => ioRef.Seeker },
        },
      },
      ReadWriter: {
        kind: "interface",
        members: {
          Reader: { kind: "embed", type: () => ioRef.Reader },
          Writer: { kind: "embed", type: () => ioRef.Writer },
        },
      },
      Reader: {
        kind: "interface",
        members: {
          Read: { kind: "field" },
        },
      },
      LimitReader: { kind: "function" },
      MultiReader: { kind: "function" },
      TeeReader: { kind: "function" },
      ReaderAt: {
        kind: "interface",
        members: {
          ReadAt: { kind: "field" },
        },
      },
      ReaderFrom: {
        kind: "interface",
        members: {
          ReadFrom: { kind: "field" },
        },
      },
      RuneReader: {
        kind: "interface",
        members: {
          ReadRune: { kind: "field" },
        },
      },
      RuneScanner: {
        kind: "interface",
        members: {
          RuneReader: { kind: "embed", type: () => ioRef.RuneReader },
          UnreadRune: { kind: "field" },
        },
      },
      SectionReader: {
        kind: "struct",
        members: {
          Outer: { kind: "method" },
          Read: { kind: "method" },
          ReadAt: { kind: "method" },
          Seek: { kind: "method" },
          Size: { kind: "method" },
        },
      },
      NewSectionReader: { kind: "function" },
      Seeker: {
        kind: "interface",
        members: {
          Seek: { kind: "field" },
        },
      },
      StringWriter: {
        kind: "interface",
        members: {
          WriteString: { kind: "field" },
        },
      },
      WriteCloser: {
        kind: "interface",
        members: {
          Writer: { kind: "embed", type: () => ioRef.Writer },
          Closer: { kind: "embed", type: () => ioRef.Closer },
        },
      },
      WriteSeeker: {
        kind: "interface",
        members: {
          Writer: { kind: "embed", type: () => ioRef.Writer },
          Seeker: { kind: "embed", type: () => ioRef.Seeker },
        },
      },
      Writer: {
        kind: "interface",
        members: {
          Write: { kind: "field" },
        },
      },
      MultiWriter: { kind: "function" },
      WriterAt: {
        kind: "interface",
        members: {
          WriteAt: { kind: "field" },
        },
      },
      WriterTo: {
        kind: "interface",
        members: {
          WriteTo: { kind: "field" },
        },
      },
    },
  } satisfies StrictDescriptor,
  true,
);

export const ioRef = io as any;
