// scripts/filter-modal.ts

class FilterModal {
    private modalOverlay: HTMLElement;
    private modalContent: HTMLElement;
    private openBtn: HTMLElement;
    private closeBtn: HTMLElement;
    private cancelBtn: HTMLElement;
    private applyBtn: HTMLElement;

    constructor() {
        this.modalOverlay = document.getElementById('filterModal')!;
        this.modalContent = this.modalOverlay.querySelector('.modal-content')!;
        this.openBtn = document.querySelector('.btn-filter')!;
        this.closeBtn = document.getElementById('modalCloseBtn')!;
        this.cancelBtn = document.getElementById('modalCancelBtn')!;
        this.applyBtn = document.getElementById('modalApplyBtn')!;

        this.init();
    }

    private init(): void {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.cancelBtn.addEventListener('click', () => this.close());
        this.applyBtn.addEventListener('click', () => this.apply());

        // Close on overlay click
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('modal-active')) {
                this.close();
            }
        });
    }

    private open(): void {
        this.modalOverlay.classList.add('modal-active');
        document.body.style.overflow = 'hidden';
    }

    private close(): void {
        this.modalOverlay.classList.remove('modal-active');
        document.body.style.overflow = '';
    }

    private apply(): void {
        console.log('Filters applied:', this.getCheckedValues());
        this.close();
    }

    private getCheckedValues(): Record<string, string[]> {
        const filters: Record<string, string[]> = {};
        const checkboxes = this.modalContent.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');

        checkboxes.forEach(cb => {
            const groupName = cb.name;
            const value = cb.value;
            if (!filters[groupName]) filters[groupName] = [];
            filters[groupName].push(value);
        });

        return filters;
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    new FilterModal();
});
