use crate::constants::*;
use crate::errors::ErrorCode;
use crate::states::*;
use anchor_lang::prelude::*;

pub fn create_poll(
    ctx: Context<CreatePoll>,
    title: String,
    description: String,
    start: u64,
    end: u64,
    mode: PollMode,
) -> Result<()> {
    let now = Clock::get()?.unix_timestamp as u64;
    require!(start < end, ErrorCode::InvalidDates);
    require!(start >= now, ErrorCode::PollNotActive);

    require!(title.len() <= 30, ErrorCode::TitleTooLong);
    require!(description.len() <= 200, ErrorCode::DescriptionTooLong);

    let poll = &mut ctx.accounts.poll;
    let counter = &mut ctx.accounts.counter;

    counter.total = counter.total.saturating_add(1);
    counter.active = counter.active.saturating_add(1);

    poll.id = counter.total;
    poll.creator = ctx.accounts.signer.key();
    poll.title = title;
    poll.description = description;
    poll.start = start;
    poll.end = end;
    poll.candidates = 0;
    poll.mode = mode;

    Ok(())
}

#[derive(Accounts)]
pub struct CreatePoll<'info> {
    #[account(init, payer = signer, space = ANCHOR_DISCRIMINATOR_SIZE + Poll::INIT_SPACE, seeds = [b"poll", (counter.total+1).to_le_bytes().as_ref()], bump)]
    pub poll: Account<'info, Poll>,
    #[account(mut, seeds = [b"counter"], bump)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
