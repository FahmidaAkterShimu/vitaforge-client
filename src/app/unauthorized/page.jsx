import Link from "next/link";

const UnauthorizedPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
            <div className="text-center">
                <p className="font-display text-7xl font-bold text-primary">
                    403
                </p>

                <h1 className="mt-4 font-display text-4xl font-bold uppercase">
                    Access Denied
                </h1>

                <p className="mt-3 max-w-md font-body text-sm text-muted">
                    You don&apos;t have permission to access this dashboard.
                </p>

                <Link
                    href="/"
                    className="mt-7 inline-flex rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                    Go Home
                </Link>
            </div>
        </main>
    );
};

export default UnauthorizedPage;